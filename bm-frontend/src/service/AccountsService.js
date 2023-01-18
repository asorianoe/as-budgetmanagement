
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

export const getCategories = async (txType) => {
  const cookie = getCookie('auth_token');
  const response = await fetch(
  `${process.env.REACT_APP_BACKEND_BASE_URL}/categories?txType=`+txType,
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

export const saveAccount = async (alias, initialBalance, currency) => {
  const cookie = getCookie('auth_token');
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_BASE_URL}/account/`,
  {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ` +cookie,
      },
      body: JSON.stringify({
              alias,
              initialBalance,
              currency
            }),
  }
  );
  const categories = await response.json();
  return categories;
};

export const saveTransaction = async (accId, txType, txCat, txAmmount, txCurrency) => {
  const cookie = getCookie('auth_token');
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_BASE_URL}/account/`+accId+'/transaction',
  {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ` +cookie,
      },
      body: JSON.stringify({
              txType,
              txCat,
              txAmmount,
              txCurrency
            }),
  }
  );
  const categories = await response.json();
  return categories;
};

export const getCurrencies  = async () => {
  const cookie = getCookie('auth_token');
  const response = await fetch(
  `${process.env.REACT_APP_BACKEND_BASE_URL}/currencies`,
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