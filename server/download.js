import ytdl from "ytdl-core";
import fs from "fs";

export const download = (videoId) =>  new Promise((resolve, reject) =>{

  const videoURL = "https://www.youtube.com/shorts/" + videoId
  console.log("Realizando o download do Vídeo:", videoId)

  ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
    .on("info", (info) => {
      const seconds = info.formats[0].approxDurationMs / 1000;
      if (seconds > 60) {
        throw new Error("A duração desse vídeo é maior que 60 Segundos.");
      }
    })
    .on("end", () => {
      console.log("Download do Vídeo Finalizado.")
      resolve()
    })
    .on("error", (error) => {
      console.log(
        "Não foi possível fazer o downloado do video. Detalhes do Erro:",
        error
      )
      reject(error)
    }).pipe(fs.createWriteStream("./tmp/audio.mp4"))
})
