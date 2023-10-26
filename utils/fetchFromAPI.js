export async function fetchFromAPI(word) {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
