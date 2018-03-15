# Vanja Ivanovic
# GitHub-repositoriet länk: https://github.com/vanjaivanovic/SunSet-SunRise-App
# GitHub pages länk: https://github.com/vanjaivanovic/SunSet-SunRise-App/tree/gh-pages

# Beskrivning av min App:
Det är en soluppgång och solnedgång-App. Man kan kolla soluppgången och solnedgången varsomhelst i världen genom att skriva in staden eller adressen, samma dag eller välja ett annat datum. Man kan också välja aktuell plats endast om besökaren tillåter det.
# Teknologier: Bootstrap
# APIer jag har använt:

Det är en Api som hämtar all solinformation. I min App har jag använt mig av soluppgång och solnedgång tiden.
https://sunrise-sunset.org/api:
https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400
https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&date=2018-03-15

Google maps API:
Denna API gör det möjligt att hämta världens platser. Jag har kopplat den till min föregående API som hämtar sol info utifrån longitude och latitude. 
https://developers.google.com/maps/documentation/javascript/libraries
https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=geometry,places

#Det som skulle kunna förbättras är att tiden på solnedgången och soluppgången visas i lokaltid. 
