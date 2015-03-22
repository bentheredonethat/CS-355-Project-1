use blevinsky;

drop table if exists Climber_Route;
drop table if exists Climber_Sponsor;
drop table if exists Route;
drop table if exists Sponsor;
drop table if exists Climber;
drop table if exists Location;

create table Sponsor(sponsorID int primary key auto_increment, sponsorName varchar(50), gearOffered varchar(50));

create table Climber(climberID int primary key auto_increment, climberName varchar(50) not null, 
	hardestGradeUS varchar(5), hardestGradeEuro varchar(5), country varchar(50), birthYear int);
    
create table Location(locationID int primary key auto_increment, physicalLocation varchar(50) unique not null, 
	hardestgradeUS varchar(5), hardestgradeEuro varchar(5), notableRoute varchar(50) unique);
    
create table Route(routeID int primary key auto_increment, routeName varchar(50) not null, 
	locationOfRoute varchar(50) references location (physical_location), difficultyUS varchar(10),
	difficultyEuro varchar(10), firstAscent varchar(50) references Climber (climber_name) on delete cascade, typeOfClimb varchar(20),
	numberPitches int null, routeSetter varchar(50) null);
    
create table Climber_Sponsor(relationID int primary key auto_increment, 
	climberID int references Climber(climberID) on delete cascade, sponsorID int references Sponsor(sponsorID) on delete cascade,
    unique(climberID, sponsorID));

create table Climber_Route(relationID int primary key auto_increment, 
	climberID int references Climber(climberID) on delete cascade, routeID int references Route(routeID) on delete cascade,
    unique(climberID, routeID));

insert into Sponsor(sponsorName, gearOffered) 
	values('La Sportiva', 'shoes'), ('prAna', 'apparel'), ('Five Ten', 'apparel, shoes');

insert into Climber(climberName, hardestGradeUS, hardestGradeEuro, country, birthYear) values
	('Chris Sharma','V15','9b+','USA',1981),
    ('Adam Ondra', 'V16', '9b+', 'Czech Republic', 1993),
    ('Sasha Digulian','V11','9a','USA',1992),
    ('Tommy Caldwell', 'V13', '9a', 'USA', 1978),
    ('Daniel Woods', 'V16', '9a+', 'USA', 1989);
    
insert into Location(physicalLocation, hardestGradeUS, hardestgradeEuro, notableRoute) values
	('Bishop', 'V15', '9a', 'Ambrosia'),
    ('Fontainebleau', 'V15', '5.15a', 'Biographie'),
    ('Red River Gorge', '5.15b', '9a+', 'Pure Imagination');
    
insert into Route(routeName, locationOfRoute, difficultyUS, difficultyEuro, firstAscent, typeOfClimb, numberPitches, routeSetter) values
	('The Dawn Wall', 'Yosemite', '5.14-15', '9a', 'Tommy Caldwell','multi' ,17, 'T. Caldwell/K. Jorgeson'),
    ('Biographie', 'Ceuse', '5.15a', '9a', 'Chris Sharma', 'sport', 1, 'Lafaille');


insert into Climber_Sponsor(climberID, sponsorID) values
	(1, 2), (5,3), (1,1),(2,1),(3,1);
    

insert into Climber_Route(climberID, routeID) values (1,2),(4,2);
