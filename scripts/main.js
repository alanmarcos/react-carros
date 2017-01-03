var React = require('react');
var ReactDOM = require('react-dom');
var h = require('./helpers');

var App = React.createClass({

	getInitialState : function(){

		return {
			carros : require('./sample-veiculos'),
			itensPerPage : 2,
			pagination: 1,
			searchQuery : '',
			isModalActive: false
		}
	},

	novoCarro : function(object){

		var carros = this.state.carros;
		carros.push(object);
		this.setState({
			carros : carros
		});
	},

	changePagination : function(numPage){

		this.setState({
			pagination: numPage
		});
	},

	changeQuery : function(value){

		this.setState({
			searchQuery: value,
			pagination: 1
		});
	},

	queryResult : function(){

		var query = this.state.searchQuery;

		function isMarcaOrCombustivel(item){

			var isMarca 		= item.marca.toLowerCase().indexOf(query.toLowerCase()) !== -1;
			var isCombustivel 	= item.combustivel.toLowerCase().indexOf(query.toLowerCase()) !== -1;

			return (isMarca || isCombustivel) ? item : false;
		}

		var retorno = this.state.searchQuery ? 
						this.state.carros.filter(isMarcaOrCombustivel) :
						this.state.carros;

		return retorno;
	},

	toggleModal : function(){

		this.setState({
			isModalActive: !this.state.isModalActive
		});

	},

	render: function() {
		return (
			<div className="container">
				<Header />
				<div className="row">
					<div className="col-sm-10 offset-sm-1">
						<div className="row">
							<div className="col-sm-6">
								<a className="btn btn-success btn-novoCarro" onClick={this.toggleModal}>Novo Carro</a>
							</div>
							<div className="col-sm-6 text-right">
								<SearchBar changeQuery={this.changeQuery} currentQuery={this.state.searchQuery} />
							</div>
						</div>
						<div className="table-responsive">
							<table className="table table-bordered">
								<thead>
									<tr>
										<th width="35"><input type="checkbox" /></th>
										<th>Placa</th>
										<th>Modelo</th>
										<th>Marca</th>
										<th>Foto</th>
										<th>Combustível</th>
										<th>Valor</th>
									</tr>
								</thead>
								<ListaCarros carros={this.queryResult()} pagination={this.state.pagination} perPage={this.state.itensPerPage} />
							</table>
							<Pagination items={this.queryResult().length} perPage={this.state.itensPerPage} currentPage={this.state.pagination} changePagination={this.changePagination} />
						</div>
						<FormCarro onClose={this.toggleModal} isActive={this.state.isModalActive} novoCarro={this.novoCarro} />
					</div>
				</div>
			</div>
		)
	}

});

var Header = React.createClass({

	render: function(){
		return (
			<div className="row">
				<div className="col-xs-12">
					<header className="header">
						<h1 className="logo">Logo ContaAzul</h1>
					</header>		
				</div>
			</div>
		)
	}

});

var SearchBar = React.createClass({

	changeQuery : function(event){

		event.preventDefault();
		var query = this.refs.search.value;
		this.props.changeQuery(query);

	},

	render: function(){
		return (
			<form className="search-form form-inline" onSubmit={this.changeQuery}>
				<div className="form-group float-xs-right">
					<label className="sr-only">Pesquisar</label>
					<div className="input-group">
						<input type="text" className="form-control" ref="search" placeholder="Pesquisar" />
						<div className="input-group-addon js-submit">BUSCAR</div>
					</div>
				</div>
			</form>
		)
	}

});

var FormCarro = React.createClass({

	createCarro : function(event){

		event.preventDefault();

		var carro = {
			combustivel : this.refs.combustivel.value,
			imagem : this.refs.imagem.value,
			marca : this.refs.marca.value,
			modelo : this.refs.modelo.value,
			placa : this.refs.placa.value.toUpperCase(),
			valor : this.refs.valor.value
		}

		this.props.novoCarro(carro);
		this.props.onClose();

	},

	handleClickDiv: function(e){
		e.stopPropagation();
	},

	render : function(){

		var divClass = this.props.isActive ? 'form-modal is-active' : 'form-modal';

		return (
			<div className={divClass} onClick={this.props.onClose}>
				<div onClick={this.handleClickDiv} className="form-container">
					<form onSubmit={this.createCarro} className="row">
						<div className="col-xs-12">
							<h4>Adicionar carro</h4>
						</div>
						<div className="col-xs-12 col-sm-6">
							<input type="text" className="form-control" ref="modelo" placeholder="Modelo" required />
						</div>
						<div className="col-xs-12 col-sm-6">
							<select className="form-control" ref="marca" required>
								<option value="">Marca</option>
								<option value="Chevrolet">Chevrolet</option>
								<option value="Citroen">Citroën</option>
								<option value="Fiat">Fiat</option>
								<option value="Ford">Ford</option>
								<option value="Honda">Honda</option>
								<option value="Hyundai">Hyundai</option>
								<option value="Peugeot">Peugeot</option>
								<option value="Renault">Renault</option>
								<option value="Volkswagen">Volkswagen</option>
								<option value="Toyota">Toyota</option>
								<option value="Audi">Audi</option>
								<option value="BMW">BMW</option>
								<option value="Chery">Chery</option>
								<option value="Chrysler">Chrysler</option>
								<option value="Jeep">Jeep</option>
								<option value="Kia">Kia</option>
								<option value="Land Rover">Land Rover</option>
								<option value="Mercedes Benz">Mercedes-Benz</option>
								<option value="Mitsubishi">Mitsubishi</option>
								<option value="Nissan">Nissan</option>
								<option value="Suzuki">Suzuki</option>
								<option value="Volvo">Volvo</option>
							</select>
						</div>
						<div className="col-xs-12 col-sm-6">
							<input type="text" className="form-control text-uppercase" ref="placa" pattern="[a-zA-Z]{3}-[0-9]{4}$" placeholder="Placa" required />
						</div>
						<div className="col-xs-12 col-sm-6">
							<select ref="combustivel" className="form-control">
								<option value="">Combustível</option>
		                    	<option value="Álcool">Álcool</option>
		                    	<option value="Diesel">Diesel</option>
		                    	<option value="Gasolina">Gasolina</option>
		                    	<option value="Bicombustível">Bicombustível</option>
		                    	<option value="GNV">GNV</option>
		                    	<option value="Tricombustível">Tricombustível</option>
		                    	<option value="Híbrido">Híbrido</option>                    	
							</select>
						</div>
						<div className="col-xs-12 col-sm-6">
							<input type="text" className="form-control" ref="imagem" placeholder="Imagem" />
						</div>
						<div className="col-xs-12 col-sm-6">
							<input type="text" className="form-control" ref="valor" placeholder="Valor" />
						</div>
						<div className="col-xs-12 text-right">
							<button type="submit" className="btn btn-block btn-success">Adicionar carro</button>
						</div>
					</form>
				</div>
			</div>
		)
	}
});

var Carro = React.createClass({

	render : function(){

		var carro = this.props.obj;
		return (
			<tr>
				<td><input type="checkbox" /></td>
				<td>{carro.placa}</td>
				<td>{carro.modelo}</td>
				<td>{carro.marca}</td>
				<td>{carro.imagem ? <a href={carro.imagem}>Imagem</a> : 'Sem Foto' }</td>
				<td>{carro.combustivel}</td>
				<td>{h.formatPrice(carro.valor)}</td>
			</tr>
		)
	}
});


var Pagination = React.createClass({

	handleClickPrev : function(){

		var newPage = (parseInt(this.props.currentPage) - 1)
		this.props.changePagination(newPage);

	},

	handleClickNext : function(){

		var newPage = (parseInt(this.props.currentPage) + 1)
		this.props.changePagination(newPage);		

	},

	changePage : function(event){

		var pagina = parseInt(event.target.dataset.key);
		this.props.changePagination(pagina + 1);

	},

	render : function(){

		var numeros 		= [],
			numPages 		= Math.ceil(this.props.items / this.props.perPage),
			classPrevious 	= this.props.currentPage == 1 ? 'page-item disabled' : 'page-item',
			classNext 		= this.props.currentPage == numPages ? 'page-item disabled' : 'page-item',
			classContainer	= this.props.items > this.props.perPage ? 'pagination-container' : 'hidden-xs-up';

		for (var i = 0; i < numPages; i++) {

			var classNumber = (this.props.currentPage == (i + 1)) ? 'page-item active' : 'page-item';
			numeros.push(<li className={classNumber} key={i}><a onClick={this.changePage} data-key={i} className="page-link" href="#">{i + 1}</a></li>);
		}

		return (
			<nav className={classContainer} aria-label="Page navigation">
				<ul className="pagination pagination-sm">

					<li className={classPrevious}>
						<a className="page-link" href="#" aria-label="Previous" onClick={this.handleClickPrev}>
							<span aria-hidden="true">&laquo;</span>
							<span className="sr-only">Previous</span>
						</a>
					</li>

					{numeros}

					<li className={classNext}>
						<a className="page-link" href="#" aria-label="Next" onClick={this.handleClickNext}>
							<span aria-hidden="true">&raquo;</span>
							<span className="sr-only">Next</span>
						</a>
					</li>
				</ul>
			</nav>
		)
	}
});

var ListaCarros = React.createClass({

	render : function(){

		var items = this.props.carros.length;
		var pagination = this.props.pagination;
		var perPage = this.props.perPage;
		var carros = [];

		var currentIndex = ((pagination - 1) * perPage);

		for (var i = currentIndex; i < (currentIndex + perPage); i++) {
			if(this.props.carros[i])
				carros.push(<Carro obj={this.props.carros[i]} key={i} />);	
		}

		console.log(carros.length);
		return (
			<tbody>
				{carros.length > 0 ? carros : <NoItems />}
			</tbody>
		)
	}
});

var NoItems = React.createClass({

	render : function(){

		return (
			<tr>
				<td colSpan="7">Nenhum carro encontrado.</td>
			</tr>
		)
	}
})

ReactDOM.render(<App />, document.querySelector('#main'));