
import { useCookies } from 'react-cookie';

export const getAccounts = async () => {
    const cookie = getCookie('auth_token');
    const response = await fetch(
    `${process.env.REACT_APP_BACKEND_BASE_URL}/account`,
    {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ` +cookie,
        },
    }
    );
    const categories = await response.json();
    return categories;
};



function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }