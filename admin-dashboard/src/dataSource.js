import {user} from './assets'

function generateRandomId() {
    return Math.floor(Math.random() * 1000000);
}

function generateRandomUsername() {
    const names = ["Alice", "Bob", "Charlie", "David", "Eva", "Frank", "Grace", "Hannah", "Ivan", "Julia", "Kevin", "Laura", "Mike", "Nina", "Oscar", "Paul", "Quincy", "Rachel", "Steve", "Tina"];
    return names[Math.floor(Math.random() * names.length)];
}

function generateRandomImageLink() {
    return user;
}

function generateRandomStatus() {
    const statuses = ["active", "passive", "pending"];
    return statuses[Math.floor(Math.random() * statuses.length)];
}

function generateRandomEmail(username) {
    const domains = ["example.com", "mail.com", "test.com", "demo.com"];
    return `${username.toLowerCase()}@${domains[Math.floor(Math.random() * domains.length)]}`;
}

function generateRandomAge() {
    return Math.floor(Math.random() * 50) + 18;
}

function generateUsers(number) {
    const users = [];
    for (let i = 0; i < number; i++) {
        const username = generateRandomUsername();
        users.push({
        id: generateRandomId(),
        username: username,
        img: generateRandomImageLink(),
        status: generateRandomStatus(),
        email: generateRandomEmail(username),
        age: generateRandomAge()
        });
    }
    return users;
}

export const userRows = generateUsers(30);

export const userColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'username', headerName: 'User', width: 230 , renderCell: (params)=>{
        return (
            <div className="cellWithImg">
                <img src={params.row.img} className='cellImg' alt={params.row.username} style={{ width: '30px', height: '30px' }}></img>
                <p color='red'>{params.row.username}</p>
            </div>
        )
    } },
    { field: 'email', headerName: 'Email', width: 210 },
    { field: 'age', headerName: 'Age', width: 100 },
    { field: 'status', headerName: 'Status', width: 150 , renderCell : (params)=>{
        return (
            <div > <span className={`cellWithStatus ${params.row.status}`}>{params.row.status}</span> </div>
        )
    } },



]