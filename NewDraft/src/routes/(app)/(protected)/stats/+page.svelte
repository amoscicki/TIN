<script>
  export let data;
  let materials = [];

  Promise.resolve(data.owned).then((owned) => {
    materials = owned;
  });
</script>

<h2 class="h2">STATS</h2>
<table class="table">
  <thead>
    <tr>
      <th>Material</th>
      <th>Time spent</th>
      <th>Time spent this week</th>
      <th>Time spent this month</th>
      <th>Time spent this year</th>
      <th>Number of hits</th>
    </tr>
  </thead>
  <tbody>
    {#each materials as material}
      <tr>
        <td>{material?.title}</td>
        <td>0h 0m</td>
        <td>0h 0m</td>
        <td>0h 0m</td>
        <td>0h 0m</td>
        <td>{material?.hits ?? 0}</td>
      </tr>
    {/each}
  </tbody>
</table>
