<script lang="ts">
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  let greeting = "";

  const messages = {
    mañana: "¡Buenos días!",
    tarde: "¡Buenas tardes!",
    noche: "¡Buenas noches!",
    madrugada: "¡Es hora de dormir!",
  };

  if (currentHour >= 6 && currentHour < 12) {
    greeting = messages.mañana;
  } else if (currentHour >= 12 && currentHour < 19) {
    greeting = messages.tarde;
  } else if (currentHour >= 19 && currentHour < 23) {
    greeting = messages.noche;
  } else {
    greeting = messages.madrugada;
  }
</script>

<h1 class="text-3xl font-bold text-white">{greeting}</h1>
