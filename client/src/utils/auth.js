

  const isLoggedIn = () => {
        const token = localStorage.getItem('token');
        return !!token;
    };

   
    const logout = () =>{
        
        localStorage.removeItem('token')
        console.log("token removed")
        window.location.href = "./login"
    }
    

    const authUtils = {
        isLoggedIn,
        logout,
    }

    export default authUtils;


