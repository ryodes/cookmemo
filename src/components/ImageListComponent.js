import * as React from "react";
import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export default function ImageListComponent({ imageChoosed, setImageChoosed }) {
  const [images, setImages] = React.useState([]);
  const [query, setQuery] = React.useState("");

  const isXs = useMediaQuery("(max-width:600px)");
  const isSm = useMediaQuery("(max-width:900px)");

  const cols = isXs ? 2 : isSm ? 3 : 4;

  const searchImages = async (term) => {
    if (!term) return;
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${term}&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}&per_page=12`
      );
      const data = await res.json();
      setImages(data.results);
    } catch (error) {
      console.error("Erreur lors de la récupération des images :", error);
    }
  };

  React.useEffect(() => {
    if (imageChoosed === null) {
      setQuery("");
      setImages([]);
    }
  }, [imageChoosed]);

  return (
    <div>
      <p className="mb-[8px]">Ajouter une image:</p>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          color: "rgb(135 138 255 / 87%)",
        }}
      >
        <input
          placeholder="Tape un mot-clé ex: pizza"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 mb-[8px]"
        />
        <Button
          onClick={(e) => {
            setImageChoosed(null);
            searchImages(query);
          }}
        >
          <SearchIcon />
        </Button>
      </Box>
      {!imageChoosed ? (
        <ImageList
          sx={{
            width: "100%",
            height: "auto",
            maxWidth: 900,
            margin: "0 auto",
            mt: "12px",
          }}
          cols={cols}
          gap={8}
          rowHeight="200px"
        >
          {images.map((item) => (
            <ImageListItem key={item.id}>
              <img
                src={item.urls.small}
                alt={item.alt_description || item.slug}
                onClick={() => setImageChoosed(item.urls.thumb)}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            src={imageChoosed}
            alt={query}
            loading="lazy"
            style={{
              height: "300px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </div>
      )}
    </div>
  );
}
