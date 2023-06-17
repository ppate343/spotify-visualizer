import axios from "axios"

// Map for localstorage keys 
const LOCALSTORAGE_KEYS = {
    accessToken: 'spotify_access_token',
    refreshToken: 'spotify_refresh_token',
    expireTime: 'spotify_token_expire_time',
    timeStamp: 'spotify_token_timestamp',
}

//map to retrieve localstorage values 

const LOCALSTORAGE_VALUES = {
    accessToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
    refreshToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
    expireTime: window.localStorage.getItem(LOCALSTORAGE_KEYS.expireTime),
    timeStamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.timeStamp),

}

//clearing out localstorage items set and reloading page 
export const logout = () => {
    for (const property in LOCALSTORAGE_KEYS) {
        window.localStorage.removeItem(LOCALSTORAGE_KEYS[property]);

    }
    //navigating to homepage 
    window.location = window.location.originl

};

// checking if the amount of time that has passed between the timestamp in localstorage and now is greater than 1 hour
//returns boolean 
const hasTokenExpired = () => {

    const { accessToken, timestamp, expireTime } = LOCALSTORAGE_VALUES
    if (!accessToken || !timestamp) {
        return false
    }
    const millisecondsElasped = Date.now() - Number(timestamp);
    return (millisecondsElasped / 1000) > Number(expireTime);
}

const refreshToken = async () => {
    try {
        //logout if theres no refresh token stored or we have managed to get into a reload loop 
        if (!LOCALSTORAGE_VALUES.refreshToken || LOCALSTORAGE_VALUES.refreshToken === 'undefined' || (Date.now() - Number(LOCALSTORAGE_VALUES.timeStamp) / 1000) < 1000) {
            console.error('no refresh token available');
            logout();
        }

        // use '/refresh_token endpoint from our node app
        const { data } = await axios.get(`/refresh_token?refresh_token=${LOCALSTORAGE_VALUES.refreshToken}`);

        //update localstorage values 
        window.localStorage.setItem(LOCALSTORAGE_KEYS.accessToken, data.access_token);
        window.localStorage.setItem(LOCALSTORAGE_KEYS.timeStamp, Date.now());

        //reload page for localstorage updates to be reflected 
        window.location.reload();

    } catch (e) {
        console.error(e);
    }
};

const getAccessToken = () => {

    //grabbing window location search value (url parameters)
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const queryParams = {
        [LOCALSTORAGE_KEYS.accessToken]: urlParams.get('access_token'),
        [LOCALSTORAGE_KEYS.refreshToken]: urlParams.get('refresh_token'),
        [LOCALSTORAGE_KEYS.expireTime]: urlParams.get('expires_in'),
    };

    const hasError = urlParams.get('error');

    // if there is an error OR the token in localstorage has expired, refresh the token
    if (hasError || hasTokenExpired() || LOCALSTORAGE_VALUES.accessToken === 'undefined') {
        refreshToken();
    }
    // if there is a valid access token in localstorage, use that token 
    if (LOCALSTORAGE_VALUES.accessToken && LOCALSTORAGE_VALUES.accessToken !== 'undefined') {
        return LOCALSTORAGE_VALUES.accessToken;
    }
    // if there is a token in the URL query params, user is logging in for the first time
    if (queryParams[LOCALSTORAGE_KEYS.accessToken]) {
        //storing the query params in localstorage
        for (const property in queryParams) {
            window.localStorage.setItem(property, queryParams[property]);
        }

        // set timestamp
        window.localStorage.setItem(LOCALSTORAGE_KEYS.timeStamp, Date.now());
        //returning access token from query params 
        return queryParams[LOCALSTORAGE_KEYS.accessToken];
    }


    // if no case is met, return false. 
    return false;

};

export const accessToken = getAccessToken();

