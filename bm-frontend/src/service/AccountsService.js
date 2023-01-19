
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

export const getCategories = async (txType, txVisible) => {
  if (cleanParam(txVisible)===''){
    txVisible='Y';
  }else if (cleanParam(txVisible)==='ALL'){
    txVisible='';
  }
  const cookie = getCookie('auth_token');
  const response = await fetch(
  `${process.env.REACT_APP_BACKEND_BASE_URL}/categories?txType=`+cleanParam(txType)+'&txVisible='+cleanParam(txVisible),
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

export const saveTranfer = async (accId, toAccId, ammount, currency) => {
  const cookie = getCookie('auth_token');
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_BASE_URL}/account/tranfer`,
  {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ` +cookie,
      },
      body: JSON.stringify({
              accId,
              toAccId,
              ammount,
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

export const getTransactions  = async (accId,txCat,txDate,txType,limit) => {
  const cookie = getCookie('auth_token');
  var query = 'accId='+cleanParam(accId)+'&txCat='+cleanParam(txCat)+'&txDate='+cleanParam(txDate)+'&limit='+cleanParam(limit)+'&txType='+cleanParam(txType); 
  const response = await fetch(
  `${process.env.REACT_APP_BACKEND_BASE_URL}/tranfer?`+ query,
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

export const getTypes  = async () => {
  const cookie = getCookie('auth_token');
  const response = await fetch(
  `${process.env.REACT_APP_BACKEND_BASE_URL}/types`,
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

function cleanParam(param){
  if (param == undefined || param == null){
    return '';
  }
  return param;  
}

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