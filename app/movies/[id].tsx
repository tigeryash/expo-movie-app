import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovieDetails } from "@/services/api";
import { icons } from "@/constants/icons";

type MovieInfoProps = {
  label: string;
  value?: string | number | null;
};

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-200 font-normal text-sm">{label}</Text>
    <Text className="text-light-100 font-bold text-sm">{value || "N/A"}</Text>
  </View>
);

const MovieDetails = () => {
  const { id } = useLocalSearchParams();

  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id as string)
  );

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />
        </View>

        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="font-bold text-white text-xl">{movie?.title}</Text>
          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-light-200 text-sm">
              {movie?.release_date?.split("-")[0]}
              <Text className="text-light-200">{movie?.runtime}</Text>
            </Text>
          </View>
          <View className="rounded-md gap-x-1 mt-2 flex-row items-center bg-dark-100 px-2 py-1">
            <Image source={icons.star} />
            <Text className="text-white font-bold text-sm">
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>
            <Text className="text-light-200 text-sm">
              ({movie?.vote_count} votes)
            </Text>
          </View>
          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={movie?.genres?.map((g: any) => g.name).join(" - ") || "N/A"}
          />
          <View className="flex flex-row justify-between w-1/2 ">
            <MovieInfo
              label="Budget"
              value={`$${Math.round(movie?.budget) / 1000000}`}
            />
            <MovieInfo
              label="Revenue"
              value={`$${Math.round(movie?.revenue) / 1000000}`}
            />
          </View>
          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies.map((c: any) => c.name).join(" - ") ||
              "N/A"
            }
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5
       flex flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180 "
          tintColor={"#fff"}
        />
        <Text className="text-base font-semibold text-white">Go back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;
