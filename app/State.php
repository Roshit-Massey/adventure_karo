<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class State extends Model
{
    protected $fillable = [ 'name','country_id'];

    public function cities()
    {
        return $this->hasMany(City::class);
    }

    public function experiences()
    {
        return $this->hasMany(Experience::class);
    }

    public function country()
    {
        return $this->belongsTo(Country::class);
    }
}
