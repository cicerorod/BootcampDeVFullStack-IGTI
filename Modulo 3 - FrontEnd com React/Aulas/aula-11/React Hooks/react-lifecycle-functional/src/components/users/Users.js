import React, { useState, useEffect } from "react";
import User from "./User";

export default function Users({ users }) {
  const [secondsVisible, setsecondsVisible] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setsecondsVisible(secondsVisible + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [secondsVisible]);

  return (
    <div>
      <p>Componente Users visível por {secondsVisible} segundos</p>
      <ul>
        {users.map((user) => {
          const { login } = user;
          return (
            <li key={login.uuid}>
              <User user={user} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
