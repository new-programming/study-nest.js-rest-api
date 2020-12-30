import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAll(): Movie[] {
        return this.movies;
    }

    // parseInt(id) = +id 同じ書き方
    getOne(id: string):Movie {
        const movie = this.movies.find(movie => movie.id === +id);
        if(!movie) {
            throw new NotFoundException(`Movie with ID ${id} not found.`);
        }
        return movie;
    }

    // parseInt(id) = +id 同じ書き方
    deleteOne(id:string) {
        this.getOne(id);
        this.movies = this.movies.filter(movie => movie.id !== +id);
    }

    create(movieData) {
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData
        });
    }

    // DBがないので、こんな変な形で進めます。。。😢
    update(id: string, updateData) {
        const movie = this.getOne(id);
        this.deleteOne(id);
        this.movies.push({...movie, ...updateData});
    }
}
