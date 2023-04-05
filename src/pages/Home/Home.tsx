import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import { Button, Container, Header, Text, Loading } from "../../components";
import { AuthContext } from "../../context/AuthContext";
import { GameService } from "../../service/GameService";
import { WordsService } from "../../service/WordsService";
import { theme } from "../../styles/theme";
import { registerEvent, registerPageView } from "../../utils/LogUtils";
import { Box } from "./HomeStyle";
import i18next from "i18next";
import { setUserProperties } from "firebase/analytics";
import { analytics } from "../../service/FirebaseService";

export function Home() {
  const { t } = useTranslation();
  const history = useNavigate();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleCreateOfflineGame = () => {
    registerEvent("play_offline");
    history("/game");
  };

  const handleCreateOnlineGame = async () => {
    if (!user) {
      toast.dark("Você precisa estar logado para jogar online");
      return;
    }

    setLoading(true);

    const gameService = new GameService();
    const game = await gameService.createGame({
      players: [
        {
          id: user?.id || "",
          name: user?.name || "",
          photoURL: user?.photoURL || "",
          letters: WordsService.makeInitialWordsState(),
          ready: true,
        },
      ],
      adminId: user?.id || "",
      correctWord: WordsService.getRandomWord(),
      status: "waiting",
      createdAt: new Date().toString(),
      language: i18next.language,
    });

    setLoading(false);
    registerEvent("play_online");
    history(`${game.key}/lobby`);
  };

  useEffect(() => {
    registerPageView("/");

    if (typeof analytics === "undefined") return;
    setUserProperties(analytics, { is_logged: !!user?.id });
  }, [user?.id]);

  return loading ? (
    <Loading />
  ) : (
    <Container>
      <Header home />

      <Text fontWeight="bold" fontSize="3rem">
        {t("home:title")}
      </Text>

      <Text fontSize="1rem" margin="0 2rem 3rem 2rem">
        {t("home:description.first")}
        <br />
        {t("home:description.second")}
      </Text>

      <Box gap="1rem">
        <Button
          color={theme.colors.letter.nonExisting}
          onClick={handleCreateOfflineGame}
        >
          {t("home:button.offline")}
        </Button>

        <Button
          color={theme.colors.letter.correctPlace}
          onClick={handleCreateOnlineGame}
        >
          {t("home:button.online")}
        </Button>
      </Box>
    </Container>
  );
}
