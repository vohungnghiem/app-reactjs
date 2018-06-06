import React, { Component } from 'react';
class TaskForm extends Component {
  
    constructor(props){
        super(props);
        this.state = {
            id : '',
            name : '',
            status : false
        }
    }
    componentWillMount() {
        if(this.props.task){
            this.setState({
                id : this.props.task.id,
                name : this.props.task.name,
                status : this.props.task.status
            });
            //console.log(this.state);
        }
    }
    componentWillReceiveProps(nextprops) {
        if(nextprops && nextprops.task){
            this.setState({
                id : nextprops.task.id,
                name : nextprops.task.name,
                status : nextprops.task.status
            });
        }else if (!nextprops.task){
            this.setState({
                id : '',
                name : '',
                status : false
            });
        }
    }
  onCloseForm = () => {
      this.props.onCloseForm();
  }
  onChange = (event) => {
      var target = event.target;
      var name = target.name;
      var value = target.value;
      if(name === 'status'){
          value = target.value === 'true' ? true : false;
      }
      this.setState({
        [name] : value
      });
  }
  onSubmit = (event) => {
      event.preventDefault();
      this.props.onSubmit(this.state);
      // cancel close
      this.onClear();
      this.onCloseForm();
  }
  onClear = ()=> {
      this.setState({
          name: '',
          status: false
      });
  }
  render() {
      var { id } = this.state;
    return(
        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
        <div className="panel panel-warning">
            <div className="panel-heading">
                <h3 className="panel-title">
                {id !== '' ? 'cap nhat cong viec' : 'them cong viec'}
                <span
                    className="fa fa-times-circle text-right"
                    onClick={this.onCloseForm}
                >
                </span>
                </h3>
                
            </div>
            <div className="panel-body">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Tên :</label>
                        <input type="text" className="form-control" 
                        name="name"
                        value={this.state.name}
                        onChange={this.onChange}
                        />
                    </div>
                    <label>Trạng Thái :</label>
                    <select className="form-control" 
                        name="status"
                        value={this.state.status}
                        onChange={this.onChange}
                    >
                        <option value={true}>Kích Hoạt</option>
                        <option value={false}>Ẩn</option>
                    </select>
                    <br/>
                    <div className="text-center">
                        <button type="submit" className="btn btn-warning">Thêm</button>&nbsp;
                        <button type="reset" className="btn btn-danger"
                            onClick={this.onClear}
                        >Hủy Bỏ</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    );
  }
}

export default TaskForm;
