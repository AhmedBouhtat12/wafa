import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
    url: "http://localhost:8080",
    realm: "perssone",
    clientId: "personne-front-end",
});

export default keycloak;