
import axios from 'axios';
import { WORDPRESS_URL } from '../page';

export const AllData = async (slug) => {
  try {
    // First API call
    let result = await axios.get(`${WORDPRESS_URL}/wp-json/custom/v1/page-acf-data?slug=${slug}`);
    
    // Check if the result is false or empty
    if (!result.data.home_pages_flexible_content) {
      // If false, make the second API call
      result = await axios.get(`${WORDPRESS_URL}/wp-json/custom/v1/page?slug=${slug}`);
    }
    
    // Return the data from the appropriate API
    return result.data;
  } catch (error) {
    console.error('Error fetching content data', error);
    return null;
  }
}

export const conatctDetail = async () => {
  try {
    const result = await axios.get(`${WORDPRESS_URL}/wp-json/wp/v2/acf-options`);
    return result.data
  } catch (error) {
    console.error('Error fetching content data', error);
    return null;
  }
}