@extends('layouts.app')


@section('content')
    <div class="container">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <div class="row">
                        <div class="col-lg-12 margin-tb">
                            <div class="pull-left">
                                <h2 data-cy="show-role-title"> Show Role</h2>
                            </div>
                            <div class="pull-right">
                                <a class="btn btn-primary" href="{{ route('roles.index') }}" data-cy="show-role-back-btn"> Back </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row flex-grow-1">
                        <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12">
                                <div class="form-group" data-cy="show-role-name">
                                    <strong>Name:</strong>
                                    {{ $role->name }}
                                </div>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12">
                                <div class="form-group" data-cy="show-role-permissions">
                                    <strong>Permissions:</strong>
                                    @if(!empty($rolePermissions))
                                        @foreach($rolePermissions as $v)
                                            <label class="label label-success">{{ $v->name }},</label>
                                        @endforeach
                                    @endif
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
