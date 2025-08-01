export interface Book {
  id: string;
  title: string;
  author: string;
  publishYear: number;
  coverUrl: string;
}

export interface BookDetails {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  publishDate: string;
  numberOfPages: number;
  coverUrl: string;
  authors: BookAuthor[];
}

export interface BookReview {
  id_resenha: string;
  comentario: string;
  nota: number;
  uid_firebase: string;
  autor: ReviewAuthor;
  comentarios: BookReview[];
}

export interface ReviewAuthor {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
}

export interface BookAuthor {
  id: string;
  name: string;
}

export interface BookReviewBody {
  uid_firebase: string;
  id_livro: string;
  nota: number;
  comentario: string;
}
