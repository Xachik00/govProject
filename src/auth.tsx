
interface authInterface {
    id: number,
    firstname: string,
    lastname: string,
    position: string,
    role: string,
    picture: string,
    status: string,
    accessToken: string,
    refreshToken: string
}
const auth = ():authInterface => {
    const authString = localStorage.getItem('auth');
    if(authString) {
        const auth = JSON.parse(authString)
        if(Date.now() < auth.lifetime) {
            return auth;
        } else {
            localStorage.removeItem('auth');
        }
    }

    return {
        id: 0,
        firstname: "",
        lastname: "",
        position: "",
        role: "",
        picture: "",
        status: "",
        accessToken: "",
        refreshToken: ""
    };
}
  
export default auth