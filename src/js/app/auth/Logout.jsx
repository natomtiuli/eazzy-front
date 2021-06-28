import React, {useState, useEffect, useContext} from "react";
import {UserContext} from "../../contexts/UserContext";

function Logout() {
    const context = useContext(UserContext);

    const [logout, setLogout] = useState(false);

    useEffect(() => {
      context.resetUser();
      setLogout(true);
    }, []);

    if (logout) window.location.replace("/");

    return (
      <div>
        Logout...
      </div>
    );
}

export default Logout;
