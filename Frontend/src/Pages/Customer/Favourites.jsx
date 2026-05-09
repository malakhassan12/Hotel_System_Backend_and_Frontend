import { Container, Title, Text, SimpleGrid, Stack } from "@mantine/core";
import useGetAllFavourites from "../../Hooks/Favourites/useGetAllFavourites";
import useAuthStore from "../../Store/authStore";
import FavoriteCard from "../../Components/Card/Favorite/FavoriteCard";
import Loading from "../../Components/Loader/Loading";
import Error from "../../Components/Loader/Error";
import { IconHeart } from "@tabler/icons-react";

const Favourites = () => {
  const { user } = useAuthStore();
  const { data, isLoading, error, refetch } = useGetAllFavourites(user?.userId);

  const favorites = Array.isArray(data) ? data : [];
  console.log(favorites);

  const handleRemove = () => {
    refetch(); // Refresh the list after removal
  };

  if (isLoading) {
    return <Loading name="Favorites" />;
  }

  if (error) {
    return <Error name="Favorites" error={error} />;
  }

  return (
    <Container size="xl" py="md">
      <Stack gap="xs" mb="lg">
        <Title order={2}>My Favorites</Title>
        <Text c="dimmed">Your saved rooms for future booking</Text>
      </Stack>

      {favorites.length === 0 ? (
        <Stack align="center" mt="xl" py={50}>
          <IconHeart size={64} stroke={1.5} color="#ccc" />
          <Text c="dimmed" ta="center" size="lg">
            No favorite rooms yet ❤️
          </Text>
          <Text c="dimmed" ta="center" size="sm">
            Start exploring and save rooms you love!
          </Text>
        </Stack>
      ) : (
        <>
          <Text c="dimmed" mb="md">
            You have {favorites.length} favorite{favorites.length !== 1 ? "s" : ""}
          </Text>
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
            {favorites.map((favorite) => (
              <FavoriteCard
                key={favorite.id}
                favorite={favorite}
                onRemove={handleRemove}
              />
            ))}
          </SimpleGrid>
        </>
      )}
    </Container>
  );
};

export default Favourites;