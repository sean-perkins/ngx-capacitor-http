import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { share } from "rxjs";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent {

  items$ = this.http
    .get<Todo[]>('https://jsonplaceholder.typicode.com/todos/')
    .pipe(
      // Share the stream for template bindings
      share()
    );

  constructor(private http: HttpClient) { }
}
