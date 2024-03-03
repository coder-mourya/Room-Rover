



  const isLoggedIn = () => {
        const token = localStorage.getItem('token');
        return !!token;

    };

    const isAuthanticateddGoogle = () =>{

        const googleProfile = localStorage.getItem('googleProfile')
        return !! googleProfile;
    }


    const getUserRole = () =>{

        const isloginMn = localStorage.getItem('token') !== null ;
        const isAuthanticatedd = localStorage.getItem('googleProfile') !== null;

        if(isloginMn || isAuthanticatedd){
            const role = localStorage.getItem('role');

            console.log(role);

            if(role === 'owner' || role === 'tanant'){
                return role
            }else{
                return 'unknown'
            }
        }else{
            console.log("user not loggend in");
            return null
        }
    }


   
    const logout = () =>{
        
        localStorage.removeItem('token')
        localStorage.removeItem('role')

        console.log("token removed")
       
        
    }

    const googleLogout = () =>{
        localStorage.removeItem('googleProfile')
        localStorage.removeItem('role')
        
       
        
    }
    

    const authUtils = {
        isLoggedIn,
        logout,
        getUserRole,
        isAuthanticateddGoogle,
        googleLogout,
    }

    export default authUtils;


