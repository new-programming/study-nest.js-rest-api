import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAll(): Movie[] {
        return this.movies;
    }

    // parseInt(id) = +id 同じ書き方
    getOne(id: string):Movie {
        return this.movies.find(movie => movie.id === +id);
    }

    // parseInt(id) = +id 同じ書き方
    deleteOne(id:string):boolean {
        this.movies.filter(movie => movie.id !== +id);
        return true;
    }

    create(movieData) {
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData
        });
    }
}
