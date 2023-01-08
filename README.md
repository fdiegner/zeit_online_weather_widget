# Gedanken/Notizen

Ich versuche hier einmal meine Gedanken zu schildern, damit besser nachvollzogen werden kann weshalb gewisse Dinge so gemacht wurden. Das sind natürlich nur persönliche Meinungen/Präferenzen von denen ich nicht sicher bin, ob sie überhaupt Sinn machen.

- Eingabe der Städtenamen: Eigentlich sollten die möglichen Städtenamen bekannt sein (Liste/JSON von openweatherapi)

  - Dadurch kann dem User eine Liste der möglichen Städtenamen vorgeschlagen werden (Bspw. Voschläge als Dropdown des Inputfeldes anzeigen, nachdem 2-3 Buchstaben durch den User eingegeben wurden)
  - Da ich keinen einfachen API-Endpunkt auf die Schnelle gefunden habe um diese Liste zu bekommen, werde ich dies nicht umsetzen. Zu einer tatsächlichen Lösung gehört es mMn allerdings zwingend dazu
  - Dem User wird aktuell nicht angezeigt, wenn seine Eingabe des Städtenamens unzulässig war. Stattdessen wird ein Fallback (location über den geolocator oder Hamburg) geladen
- Es wird nicht abgefangen, ob mit den Koordinaten im `localStorage` alles in Ordnung ist. Bevor diese an die fetch-Methode weitergeleitet werden, müssten sie geprüft werden. Aus Zeit und Aufwandsgründen, wurde dies nicht gemacht.

- Die größte Hürde war für mich zu entscheiden, wo genau (sowohl im DOM als auch Visuell) ich das Widget platziere.


  - Durch die absolute Positionierung des Logos bzw. des `header__brand`-divs ausserhalb des `nav`-divs war mein erster Impuls das Widget auf eine Ebene mit dem `header__brand` zu setzen, um saubere/einfache Responsivität gewährleisten zu können.  
    Diese Platzierung hat das Widget mobil zum einen zu klein gemacht und zum Anderen das Widget mehr herausgehoben als andere Elemente der Navigation (vor allem die Suche).

  - Deshalb habe ich mich dazu entschieden, es mit den anderen Navigations-Elementen auf eine Ebene zu setzen. Darüber hinaus habe ich ebenfalls die Suche und das Widget zusammen gruppiert, und sie mobil in eine Zeile gebracht.  
     Das war eine persönliche Design-Präferenz. Das Widget und die Suche mobil untereinander anzuordnen wäre mMn von der Usability vermeintlich sogar besser. (Wird der Städtename sehr sehr lang könnte die Suche sehr klein werden, wenn der Viewport entsprechend schmal ist)  
       
    Hierfür musste ich allerdings bereits vorhandenes CSS der `nav__suche` überschreiben. Ich hoffe das war in Ordnung. Ich habe mich bemüht, dies so wenig wie möglich zu machen

- Die zweite größere Hürde habe ich mir leider selbst gestellt. Ich habe über die Feiertage (als ich im Fieberdelirium im Bett lag) etwas mit Svelte herumgespielt (genauer gesagt Sveltekit). Deshalb hielt ich es für eine gute Idee die Aufgabe in Svelte umzusetzen.  
Leider ist mir während der Umsetzung klar geworden, dass ich bspw. die Reaktivität von Svelte noch nicht so gut verstanden habe wie ich das dachte. Ich denke das sieht man deutlich im Code.  


- Die dritte Hürde für mich, war die (durch mich) begrenzte Zeit. Ich musste teilweise auf unschöne Workarounds zurückgreifen:
  -  Dass die `width` in die `WeatherSettings` Komponente übergeben wird, um CLS zu vermeiden
  - Dass ein Hilfs-Div (`nav__placeholder`) mit der Breite des `header__brand`-divs genutzt wurde, um die Problematik des Umbrechens zu lösen.



# Svelte Readme

## create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

