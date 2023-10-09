DROP DATABASE IF EXISTS exercise_tracker;
CREATE DATABASE exercise_tracker, function (Blueprint $table) {
    $table->id();
    $table->string('title')
    $table->dateTime('start');
    $table->dateTime('end');
    $table->timestamps();
};