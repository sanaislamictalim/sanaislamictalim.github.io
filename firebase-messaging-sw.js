importScripts(
  "https://www.gstatic.com/firebasejs/12.17.1/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/12.17.1/firebase-messaging-compat.js"
);


firebase.initializeApp({

  apiKey:
    "AIzaSyAn3S_GQvt3Vd99JDzjfPEi5OuxDBasqaQ",

  authDomain:
    "sanaislamictalim-3f36b.firebaseapp.com",

  projectId:
    "sanaislamictalim-3f36b",

  storageBucket:
    "sanaislamictalim-3f36b.firebasestorage.app",

  messagingSenderId:
    "783399416662",

  appId:
    "1:783399416662:web:cb52166ef262da565e9cf7"

});


const messaging =
  firebase.messaging();


messaging.onBackgroundMessage(
  function(payload){

    console.log(
      "Background message:",
      payload
    );

    const notification =
      payload.notification || {};

    const title =
      notification.title ||
      "🕌 Sana Islamic";

    const options = {

      body:
        notification.body ||
        "नई Islamic notification आई है।",

      icon:
        "/assets/header_logo.png",

      badge:
        "/assets/header_logo.png"

    };


    self.registration.showNotification(
      title,
      options
    );

  }
);


self.addEventListener(
  "notificationclick",
  function(event){

    event.notification.close();

    event.waitUntil(

      clients.matchAll({
        type: "window",
        includeUncontrolled: true
      }).then(function(clientList){

        for(
          const client of clientList
        ){

          if(
            client.url ===
              "https://sanaislamictalim.github.io/" &&
            "focus" in client
          ){

            return client.focus();

          }

        }


        if(
          clients.openWindow
        ){

          return clients.openWindow(
            "https://sanaislamictalim.github.io/"
          );

        }

      })

    );

  }
);
