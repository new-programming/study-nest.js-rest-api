import { Controller, Get, Param, Post, Delete, Patch, Query, Body } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {

    constructor(private readonly movieService: MoviesService) {}

    @Get()
    getAll(): Movie[] {
        return this.movieService.getAll();
    }

    // idの下に作成すると、searchをidで認識してしまうので気をつけてください
    @Get("search")
    ssearch(@Query("year") searchingYear: string) {
        return `We are searching for a movie with a title: ${searchingYear}`;
    }

    @Get("/:id")
    getOne(@Param("id") movieId: string): Movie {
        return this.movieService.getOne(movieId);
    }

    @Post()
    create(@Body() movieData) {
        return this.movieService.create(movieData);
    }

    @Delete("/:id")
    remove(@Param("id") movieId: string) {
        return this.movieService.deleteOne(movieId);
    }

    // 一部アップデート
    @Patch("/:id")
    patch(@Param("id") movieId: string, @Body() updateData) {
        return this.movieService.update(movieId, updateData);
    }
}

