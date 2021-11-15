import React from 'react'
import axios from 'axios';
import './App.scss'
import Pagination from '@material-ui/lab/Pagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import { AppBar, Toolbar } from "@material-ui/core";

interface IPost {
	id: number;
	userId?: number;
	title: string;
	body: string;
}

const defaultPosts: IPost[] = [];
const App: React.FC = () => {

	const [posts, setPosts]: [IPost[], (posts: IPost[]) => void] = React.useState(defaultPosts);
	const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true);
	const [error, setError]: [string, (error: string) => void] = React.useState("");
	const [page, setPage]: [number, (value: number) => void] = React.useState(1);
	
	React.useEffect(() => {
	   window.scrollTo(0,0)
		
	}, [page])
	
	React.useEffect(() => {
		axios
			.get(`https://gorest.co.in/public/v1/posts?page=${page}`)
			.then(response => {
				const { data: { data } } = response
				setPosts(data);
				setLoading(false);
			})
			.catch(ex => {
				const error =
					ex.response.status === 404
						? "Resource Not found"
						: "An unexpected error has occurred";
				setError(error);
				setLoading(false);
			});
	}, [page]);

	const handleChange = (event: any, value: number) => {
		setPage(value);
	};

	return (
		<div className="container">
				<AppBar style={{ backgroundColor: '#000' }}>
					<Toolbar style={{margin:'auto'}}>
						<img src={require("./images/logo/moovinimg.png")}/>
						</Toolbar>
				</AppBar>
			<div className="container" style={{marginTop: '95px', marginBottom:'50px'}}>
				<div className="card" style={{ minHeight: '100vh', padding: '15px' }}>
					<caption> Últimas postagens</caption>
					{loading ? (
						<div className='d-flex justify-content-center align-items-center mt-15'>
							<CircularProgress />
						</div>
					) : (

						<table className="table table-hover">
							<thead style={{ backgroundColor: '#EFEEEE' }}>
								<tr>
									<th scope="col">Título</th>
									<th scope="col">Conteúdo</th>
								</tr>
							</thead>
							<tbody>
								{posts && posts.map((row) => {
									return (<tr key={row.id}>

										<td className="text-sm-left">
											{row.title}
										</td>
										<td className="text-sm-left">
											{row.body}
										</td>

									</tr>
									)
								})}
								<td className="text-sm-left">
									Exibindo {posts.length} postagens
								</td>

								<td className="d-flex justify-content-end">
									<Pagination count={posts.length} page={page} onChange={handleChange} />
								</td>
							</tbody>
						</table>
					)
					}
				</div>
			</div>
		</div>
	);
}

export default App
