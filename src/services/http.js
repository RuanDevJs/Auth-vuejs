export default {
    async auth(email, password){
        const res = await (await fetch("http://localhost:3000/users")).json();
        const login = res.find((record) => {
            return record.email === email && record.password === password;
        });
        return login;
    },
    async find(id){
        const res = await (await fetch(`http://localhost:3000/users/${id}`)).json();
        return res;
    }
}