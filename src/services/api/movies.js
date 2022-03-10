import axios from 'axios';

class MovieService {
  constructor() {
    // Set base url for API calls
    this.baseUrl = '/api/movies';

    // Load movies from localStorage
    this.records = [];
  }

  async getFromApi({ data, params }) {
    try {
      const response = await axios.get(this.baseUrl, {
        params,
        data,
        crossdomain: true
      });
      return response.data;
    } catch (error) {
      return [];
    }
  }

  /**
   * Search for movie
   * @param {string} s - Query to search for
   */
  async search(s) {
    const data = await this.getFromApi({ params: { s } });
    return data.Search;
  }

  async searchByTitle(t = '') {
    const data = await this.getFromApi({ params: { t } });
    return data;
  }

  async searchById(i = '') {
    const data = await this.getFromApi({ params: { i } });
    return data;
  }

  /**
   * Add records to store, save current state to localStorage, and emit
   * change event.
   * @param records
   */
  add(records = []) {
    // Set current state of store's records to localStorage
    localStorage.setItem('movies', JSON.stringify(records));

    // Set records
    this.records = records;

    return this;
  }

  async getMovies(req, res) {
    if (!(req.query.s || req.query.i)) {
      return res.status(404).json({
        message: 'Must supply search query (`s` for title search or `i` for id search)'
      });
    }

    try {
      const response = await axios.get('http://www.omdbapi.com', {
        params: {
          apiKey: import.meta.env.REACT_APP_OMDB_API_KEY,
          ...req.query
        }
      });

      return res.json(response.data);
    } catch (error) {
      return res.json({ message: 'Server Error' });
    }
  }
}

// Create new store
export default new MovieService();
