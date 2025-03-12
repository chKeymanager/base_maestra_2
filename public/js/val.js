window.onpageshow = function () {
    fetch("/validar")
        .then((result) => result.json())
        .then((rs) => {
            console.log(rs);
            var usuario = rs.usuario;
            if (!usuario) {
                window.location = `/`;
            } else {
                document.getElementById("ultimaVisita").textContent = rs.date_update;
            }
        })
        .catch((error) => {
        console.log("Error: ", error);
        })
};

document.getElementById("year").innerHTML = new Date().getFullYear();
