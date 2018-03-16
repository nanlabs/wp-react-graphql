
import Config from '../Config';

export const sanitize = (html) => {
  return html.replace(/=\"\/wp-content\//g, '="' + Config.wordpressUrl + 'wp-content/');
}