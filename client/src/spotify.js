
const getAccessToken = () => {

    //grabbing window location search value (url parameters)
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const accessToken = urlParams.get('access_token')
    const refreshToken = urlParams.get('refresh_token');
    // console.log("access", accessToken, "refresh", refreshToken);

    return accessToken;

};

export const accessToken = getAccessToken();

