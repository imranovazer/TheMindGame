
import axios from 'axios'
import { useAuthHeader, createRefresh } from 'react-auth-kit'
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

const refreshApi = createRefresh({

    interval: 5,   // Refreshs the token in every 1 minutes
    refreshApiCallback: (
        {
            authToken,
            authTokenExpireAt,
            refreshToken,
            refreshTokenExpiresAt,
            authUserState

        }) => {
        axios.post('http://localhost:8080/auth/login/refresh',
            {
                refresh: getCookie("_auth_refresh")

            }
        ).then(({ data }) => {

            document.cookie = ` _auth_refresh=${data.refresh};`;
            document.cookie = ` _auth=${data.access} ;`;

            return {
                isSuccess: true,  // For successful network request isSuccess is true
                // newAuthToken: data.access,
                // newRefreshToken: data.refresh,
                // newAuthUserState: { refresh: data.refresh }
                // You can also add new refresh token ad new user state
            }
        }).catch((e) => {
            console.error(e)
            return {
                isSuccess: false // For unsuccessful network request isSuccess is false
            }
        })
    }
})

export default refreshApi;