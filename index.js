const admin = require("firebase-admin");
const { v1:uuidv1 } = require('uuid');
const serviceAccount = require("./firestore.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://firestore-test-e6bc8.firebaseio.com"
});

const db = admin.firestore();

let docRef = db.collection('users').doc('alovelace');

const user = {
    firstName: 'thaw',
    lastName: 'htuns',
    year: 1989
}
const key = uuidv1();
const id = '4f19fb60-5950-11ea-867c-fb59c27f3018';

const createRecord = async (key,data) => {
    try{
        const doc =  {
            first: data.firstName,
            last: data.lastName,
            born: data.year
        };
       const result =  await db.collection('users').doc(key).set(doc);
    }catch(err){
        throw new Error(err);
    }
    
    
}

const getAll = async() => {
    try{
        let result = [];
        const snapShot = await db.collection('users').get();
        
        snapShot.forEach(doc=> {result.push(doc.data())});
        return result;
    }catch(err){
        throw new Error(err)
    }
}

const get  = async(key) => {
    try{
        const user = await db.collection('users').doc(key).get()
        if(user.exists){
            return user.data();
        }else{
            return {};
        }
    }catch(err){
        throw new Error(err);
    }
}

createRecord(key,user).then(data => console.log(data))
getAll().then(data=>console.log(data));
get(id).then(data=>console.log(data));