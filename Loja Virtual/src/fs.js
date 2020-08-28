/*console.log('entrei')
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");
var db = firebase.firestore();

db.collection("produtos").where('categoria', '>=', 'R').where('categoria', '<', 'S').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${Object.values(doc.data())}`);
        console.log(`${doc.data()[0]}`);
    });
});





var user = firebase.auth().currentUser;

user.updateProfile({
  displayName: "Jane Q. User",
  photoURL: "https://example.com/jane-q-user/profile.jpg"
}).then(function() {
  // Update successful.
}).catch(function(error) {
  // An error happened.
});
*/