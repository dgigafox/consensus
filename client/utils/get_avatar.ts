const avatars: Record<string, string> = {
  "Leni Robredo": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/14th_Vice_President_of_the_Philippines_Leni_Robredo.png/220px-14th_Vice_President_of_the_Philippines_Leni_Robredo.png",
  "Ping Lacson": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Sen._Panfilo_M._Lacson_cropped.jpg/220px-Sen._Panfilo_M._Lacson_cropped.jpg",
  "Isko Moreno": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/IskoMorenoOfficialPortrait.jpg/220px-IskoMorenoOfficialPortrait.jpg",
  "Manny Pacquiao": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Pacquiao_and_Didal_%28cropped%29.jpg/220px-Pacquiao_and_Didal_%28cropped%29.jpg",
  "Bongbong Marcos": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bongbong_Marcos.jpg/220px-Bongbong_Marcos.jpg"
}

export default function getAvatar(name: string | null) {
  if (name) {return avatars[name]}
  return null;
}