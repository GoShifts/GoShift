export function registerUser(userData) {
  return new Promise(async (resolve) => {
    console.log("API Called");
    const response = await fetch("http://localhost:8000/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    // console.log(response);
    const data = await response.json();
    resolve(data);
  });
}

export function loginUser(loginInfo) {
  console.log("Login api");
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8000/auth/login`, {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        console.log({ data });
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}
