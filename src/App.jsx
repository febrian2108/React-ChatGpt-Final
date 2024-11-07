// Import `useState` dari React dan OpenAI API library
import { useState } from "react";
import { OpenAIApi, Configuration } from "openai";

// Konfigurasi API dengan kunci API
const apiKey = "API-ChatGpt";
const configuration = new Configuration({ apiKey });
const openai = new OpenAIApi(configuration);

function App() {
  // State untuk input pengguna dan output dari API
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  // Fungsi untuk menangani pengiriman formulir
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman
    
    // Meminta respons dari OpenAI
    const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: input,
      max_tokens: 200,
    });

    // Menyimpan respons di state `output`
    setOutput(response.data.choices[0].text);
  };

  return (
    <div className="neutral-800 text-gray-100 h-screen flex flex-col dark:bg-gray-800 dark:text-gray-50">
      <div className="flex-1 overflow-y-scroll">
        {/* Dialog awal antara AI dan pengguna */}
        <div className="flex justify-end mt-2 mr-2">
          <div className="bg-green-400 rounded-lg px-4 py-2 text-black max-w-sm">
            Halo, Siapa Kamu?
          </div>
        </div>
        <div className="flex justify-start mt-2 ml-2">
          <div className="bg-gray-300 rounded-lg px-4 py-2 text-black max-w-sm">
            Halo, saya ChatBot yang dibuat menggunakan API ChatGpt yang menggunakan model text-davinci-003
          </div>
        </div>
        {/* Tampilkan respons AI jika ada */}
        {output && (
          <div className="flex justify-end mt-2 mr-2">
            <div className="bg-green-500 rounded-lg px-4 py-2 text-black max-w-sm">
              {output}
            </div>
          </div>
        )}
      </div>
      {/* Input dan tombol kirim */}
      <form onSubmit={handleSubmit}>
        <div className="flex items-center">
          <input
            type="text"
            className="w-full border rounded-lg py-2 px-4 dark:bg-gray-700 dark:text-gray-200"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 rounded-lg px-4 py-2 text-white ml-2"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
