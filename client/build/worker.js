self.addEventListener("push", e => {
    const data = e.data.json();

    self.registration.showNotification(data.title, {
        body: "PAVA - notification",
        icon: "https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png"
    });


});