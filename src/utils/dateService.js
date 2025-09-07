// Servicio para obtener la fecha real desde fuentes externas
// Evita que usuarios hagan trampa cambiando la fecha del dispositivo

const DATE_APIS = [
  'https://worldtimeapi.org/api/timezone/Etc/UTC'
];

class DateService {
  constructor() {
    this.cachedDate = null;
    this.lastFetch = null;
    this.CACHE_DURATION = 5 * 60 * 1000; // 5 minutos
  }

  /**
   * Obtiene la fecha actual desde una API externa confiable
   * @returns {Promise<string>} Fecha en formato YYYY-MM-DD
   */
  async getRealDate() {
    try {
      // Si tenemos una fecha cacheada reciente, la usamos
      if (this.cachedDate && this.lastFetch && 
          (Date.now() - this.lastFetch) < this.CACHE_DURATION) {
        return this.cachedDate;
      }

      // Intentar con diferentes APIs
      for (const apiUrl of DATE_APIS) {
        try {
          const date = await this.fetchFromAPI(apiUrl);
          if (date) {
            this.cachedDate = date;
            this.lastFetch = Date.now();
            return date;
          }
        } catch (error) {
          console.warn(`Failed to fetch from ${apiUrl}:`, error);
          continue;
        }
      }

      // Si todas las APIs fallan, usar fecha local como último recurso
      // pero marcar que es potencialmente insegura
      console.warn('All date APIs failed, falling back to local date (potentially unsafe)');
      return this.getLocalDate();

    } catch (error) {
      console.error('Error getting real date:', error);
      return this.getLocalDate();
    }
  }

  /**
   * Intenta obtener fecha de una API específica
   * @param {string} apiUrl 
   * @returns {Promise<string|null>}
   */
  async fetchFromAPI(apiUrl) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 segundos timeout

    try {
      const response = await fetch(apiUrl, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
        }
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return this.parseAPIResponse(data, apiUrl);

    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  /**
   * Parsea la respuesta de diferentes APIs de fecha
   * @param {Object} data 
   * @param {string} apiUrl 
   * @returns {string|null}
   */
  parseAPIResponse(data, apiUrl) {
    try {
      let dateString = null;

      if (apiUrl.includes('worldtimeapi.org')) {
        // WorldTimeAPI: { datetime: "2025-09-07T10:30:00.000000+00:00" }
        dateString = data.datetime;
      } else if (apiUrl.includes('timezonedb.com')) {
        // TimezoneDB: { formatted: "2025-09-07 10:30:00" }
        dateString = data.formatted;
      } else if (apiUrl.includes('worldclockapi.com')) {
        // WorldClockAPI: { currentDateTime: "2025-09-07T10:30Z" }
        dateString = data.currentDateTime;
      }

      if (dateString) {
        // Convertir a formato YYYY-MM-DD
        const date = new Date(dateString);
        if (!isNaN(date.getTime())) {
          return date.toISOString().split('T')[0];
        }
      }

      return null;
    } catch (error) {
      console.error('Error parsing API response:', error);
      return null;
    }
  }

  /**
   * Obtiene la fecha local como fallback
   * @returns {string}
   */
  getLocalDate() {
    const now = new Date();
    return now.toISOString().split('T')[0];
  }

  /**
   * Valida si una fecha está en el rango correcto (no muy en el futuro/pasado)
   * @param {string} dateString 
   * @returns {boolean}
   */
  isValidGameDate(dateString) {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffDays = Math.abs(now - date) / (1000 * 60 * 60 * 24);
      
      // La fecha debe estar dentro de un rango razonable (no más de 30 días de diferencia)
      return diffDays <= 30;
    } catch {
      return false;
    }
  }

  /**
   * Obtiene el número de días transcurridos desde una fecha base
   * Útil para calcular qué puzzle mostrar
   * @param {string} baseDate Fecha base en formato YYYY-MM-DD
   * @returns {Promise<number>}
   */
  async getDaysSinceDate(baseDate) {
    try {
      const currentDate = await this.getRealDate();
      const current = new Date(currentDate);
      const base = new Date(baseDate);
      
      const diffTime = current - base;
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      return Math.max(0, diffDays); // No permitir días negativos
    } catch (error) {
      console.error('Error calculating days since date:', error);
      return 0;
    }
  }
}

// Instancia singleton
const dateService = new DateService();

export default dateService;