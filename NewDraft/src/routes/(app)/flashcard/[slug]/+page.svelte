<div>
  <h1 class="text-4xl">FLASHCARD</h1>
</div>
<div>
  <ul class="flex flex-row gap-10 text-3xl">
    <!-- prev page -->
    <a
      href="flashcard.html"
      class="flex items-center justify-center p-2 border rounded-md w-fit aspect-square"
    >
      <li>&lt;</li>
    </a>
    <li
      class="w-[350px] h-[400px] border rounded-md flex justify-center items-center p-2 cursor-pointer"
      onclick="document.getElementById('question').classList.toggle('hidden');
                                 document.getElementById('answer').classList.toggle('hidden');"
    >
      <div id="question">QUESTION?</div>
      <div id="answer" class="hidden">ANSWER</div>
    </li>
    <!-- next page -->
    <a
      href="flashcard.html"
      class="flex items-center justify-center p-2 border rounded-md w-fit aspect-square"
    >
      <li>&gt;</li>
    </a>
  </ul>
  <div class="m-4 text-3xl text-center">1 / 10</div>
</div>
