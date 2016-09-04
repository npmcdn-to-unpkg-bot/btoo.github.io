portfolio.directive('networkMap', [
	// 'd3Service',
	'$http',
	function($http){
		return {
			restrict: 'EA',
			controller: 'PortfolioController',
			// require: '^PortfolioController',
			link: (scope, elem, attrs, PortfolioController) => {
				// console.log(scope);

				var width, height; //Map dimensions
				var scale = 1; //initial zoom scale
				var zoom = d3.behavior.zoom() //zoom
					.scaleExtent([.02, 5])
					.on("zoom", zoomed);
				var drag, //Drag nodes without panning screen
					svg, //scalable vector graphic
					container, //container of the map (to be put inside the svg)
					force, //Physics of graph
					link,
					node,
					campaignid, drawid; //Campaign and draw initilization (Dan note= will get this from set campaign ID.)

				// $(document).on('ready', function(){
					width = Math.min(document.documentElement.clientWidth - 42, 800);
					height = Math.min(document.documentElement.clientHeight - 42, 800);

					force = d3.layout.force() //Initializations of physics
						/*.gravity(.2)
						.distance(50) //was 150
						//.linkDistance(???)
						//.linkDistance(???)
						.linkStrength(.5) //.01
						.charge(-50) //Perhaps make charge proportional to drawID
						.size([width, height]);*/

					drag = force.drag() //Give dragging nodes priority over panning the screen
						.on("dragstart", function() { d3.event.sourceEvent.stopPropagation(); });
				// });

				displayMap(0, 0);

				//Display the map after initializations. Keep in mind that you will not be able to see the map until you run updateMap
				function displayMap(campaignID, drawID) { //this did have no input
					$('#networkmap').css({ display: 'inline-block' });
					campaignid = campaignID;
					drawID = 0;

					if (svg != undefined) { //Refresh map by first removing the currently displayed map, if there is one
						svg.selectAll("*").remove();
						if (document.getElementById("networkmapsvg") != null) {
							$("#networkmapsvg").remove();
						}
					}

					svg = d3.select("#networkmap").append("svg") //Insert the svg element inside the element with id "networkmap"	
						//Give the svg element these attributes
						.attr("id", "networkmapsvg")
						.attr("width", "100%")
						.attr("height", "100%")
						.attr("background-color", "white")
						.call(zoom) //zoom behavior
						.attr("style", "cursor:move")
						.on("dblclick.zoom", null); //will not zoom when you dblclick

					container = svg.append("g") //group all the svg elements into a container
						//.attr("transform", "translate(300,200) scale(" + scale + ")")
						.attr("id", "mapcontainer");
					//.call(zoom)//zoom behavior
					//.on("dblclick.zoom", null);//will not zoom when you dblclick

					// d3.json(dashboardApiUrl+"networkmap/"+campaignid+"123456", function(error, data) { //was error, json
					// d3.json(dashboardApiUrl+"networkmap/"+campaignid+"123456", function(error, data) { //was error, json
					$http.get('resources/json/network-map.json').then(response => {
						// console.log(response.data);
						// console.log(data);
						var items = JSON.stringify(response.data);
						var json = JSON.parse(items); //All the data for the campaign
						//var displayedData = {nodes:[], links:[]};// Only the displayed data
						var displayedlinks = { nodes: [], links: [] }; //Only the displayed links (only the links will be changing when you switch between rounds. nodes stay the same)

						// --------------- CASE HANDLING FOR WHEN THERE ARE NO LINKS YET -------------------
						if (json["error"] != undefined) { //catch when getJSON returns an error, i.e. NO links exist for this campaign (maybe no matches have happened)
							$('#maplegendholder').empty();
							$('#mapdateholder').empty();
							$('#networkmap').empty();
							$('#networkmap').append('<span id="mapErrorMessage"><strong>' + json['error'] + '</strong></span>');
							$("#roundsListButton").attr("disabled", "");
							$("#mapcontrols button").css("color", "#666");
							console.log('d3 json call got error: ' + json['error']);
							return;
						} else {
							$("#mapErrorMessage").remove();
							$("#mapcontrols button").removeAttr("disabled");
							$("#mapcontrols button").css("color", "#333");
							$("#roundsListButton").removeAttr("disabled");
						}
						// --------------- END CASE HANDLING FOR WHEN THERE ARE NO LINKS YET -------------------

						var totalRounds = Math.max.apply(Math, json.links.map(function(o) {
							return o.value; })); //The total amount of rounds drawn so far
						drawID = totalRounds;

						// --------------- CREATION OF DROPDOWN MENU -------------------
						function buildRoundsList(totalRounds) { //Build the dropdown menu for selecting the rounds
							//first clear the list
							$("#rounds-list").empty();

							var roundsList = document.getElementById("rounds-list");
							for (var i = 0; i <= totalRounds; i++) {
								console.log('ere');
								var newRoundsListItem = document.createElement("li");
								var newRoundsListItemLink = document.createElement("a");
								var roundsListValue = document.createTextNode((thiscampaignDates[i])); //totalRounds+1-i
								newRoundsListItem.setAttribute("class", "round");
								newRoundsListItem.setAttribute("id", "round-" + i);
								newRoundsListItem.appendChild(newRoundsListItemLink);
								newRoundsListItemLink.appendChild(roundsListValue);
								newRoundsListItemLink.setAttribute("href", "#");
								newRoundsListItemLink.setAttribute("class", "round-link");
								newRoundsListItemLink.setAttribute("onclick", "changeMatchTable('matchDate-" + i.toString() + "'); selectRound(" + (totalRounds - i) + "); return false;");
								roundsList.appendChild(newRoundsListItem);
							}
						}

						$('#roundsListButton').on('click', function(event) {
							buildRoundsList(totalRounds);
						});

						$(document).on('click', '#rounds-list.dropdown-menu li a', function() { //Text in the dropdown menu changes to the selected text
							var text = $(this).text();
							$(this).parents("#selectDrawRound").find('#roundsListButton').html($(this).text() + "<span class='caret'></span>");
							$('#matchListButton').html(text + "<span class='caret'></span>");
						});
						// --------------- END CREATION OF DROPDOWN MENU -------------------

						//creation of displayed links array
						function updateDisplayedLinks() { //filter and filter state are optional parameter
							for (var i = 0; i < json.links.length; i++) { //Update the displayedlinks with array all the links
								if (json.links[i].value <= drawID) { //value is the round, so filter out all the links that are made in a future draw
									displayedlinks.links.unshift(json.links[i]);
								}
							}
						}

						//--------------- CREATION OF INITIAL ARRAY OF DISPLAYED LINKS -------------------
						updateDisplayedLinks();
						//--------------- END CREATION OF INITIAL ARRAY OF DISPLAYED LINKS -------------------

						if (json["error"] != undefined) { //catch when getJSON returns an error, i.e. NO links exist for this campaign (maybe no matches have happened)
							$('#networkmap').empty();
							$('#networkmap').append('<span><strong>' + json['error'] + '</strong></span>');
						} else { //If data is there, update the map with the information

							//----------------------------------- UPDATE/CREATE MAP FUNCTION ----------------------------------- 
							function updateMap(links, drawid) {

								//------------------- CASE HANDLING FOR MAP CONTROLS -------------------
								if ($('#matchTable tbody').is(':empty') && !(json['error'] == undefined)) {
									$('#matchTable thead').html(
										"<tr>" +
										"<th>" +
										json["error"] +
										"</th>" +
										"</tr>"
									);
								} else {
									$('#matchTable thead').empty();
								}

								if ($('networkmapsvg').length > 0) {
									$("#mapcontrols button").attr("disabled", "");
									$("#selectMatchRound").attr("disabled", "");
									$("#matchListButton").attr("disabled", "");
								} else {
									$("#mapcontrols button").removeAttr('disabled');
									$("#selectMatchRound").removeAttr('disabled');
									$("#matchListButton").removeAttr("disabled");
								}

								if (drawid >= totalRounds) {
									$('#next-round').attr('disabled', 'disabled');
									$('#previous-round').removeAttr('disabled');
								} else if (drawid <= 0) {
									$('#previous-round').attr('disabled', 'disabled');
									$('#next-round').removeAttr('disabled');
								} else {
									$('#next-round').removeAttr('disabled');
									$('#previous-round').removeAttr('disabled');
								}

								$('#playMap').removeAttr('disabled');
								$('#pauseMap').removeAttr('disabled');

								$('#selectMatchRound').removeAttr('disabled');
								//------------------- END CASE HANDLING FOR MAP CONTROLS -------------------

								svg.selectAll(".links").data(force.links()).remove(); //Remove all preexisting links
								svg.selectAll(".nodes").data(force.nodes()).remove(); //Remove all preexisting nodes

								//---------- SCALE PHYSICS OF GRAPH ACCORDING TO DRAWID -------------
								var linkStrength = .5; //Reset the linkstrength
								var newLinkStrength;
								//if(drawid>0){newLinkStrength = linkStrength - drawid*(linkStrength/totalRounds);} //Scale the link strength according to how many rounds you want to view
								if (drawid > 0) { newLinkStrength = linkStrength / drawid; } //Scale the link strength according to how many rounds you want to view
								else { newLinkStrength = .5; }

								var charge = -200;
								var newCharge;
								if (drawid > 0) { newCharge = (charge - drawid * (charge / totalRounds)); } else { newCharge = -200; }

								var distance = 200; //was 500

								force
									.nodes(json.nodes)
									.links(links)
									// .linkStrength(newLinkStrength)
									.linkStrength(function(d) { //confirmed meetings should have twice the link strength of unconfirmed ones
										if (d.source_response >= 1 || d.target_response >= 1) {
											return 2 * newLinkStrength;
										} else {
											return .2 * newLinkStrength;
										}
									})
									.gravity(.08) //.1 for totalRounds
									.distance(distance) //was 150
									.linkDistance(function(d) {
										if (d.source_response >= 1 || d.target_response >= 1) {
											return 50;
										} else if (d.source_response === null && d.target_response === null) {
											return 100;
										} else if (d.source_response <= 0 || d.target_response <= 0) {
											return 100;
										} else {
											return 100;
										}
									})
									.charge(-200) //Perhaps make charge proportional to drawID
									.friction(.9)
									.size([width, height])
									.start(); //IMPORTANT: activate (start) the physics of the graph
								//---------- END SCALE PHYSICS OF GRAPH ACCORDING TO DRAWID -------------

								//--------- CREATION OF LINKS--------------
								link = container.data(force.links())
									.append("g") //Appending attributes and visuals to the links
									.attr("class", "links")
									.selectAll(".link")
									.data(links)
									.enter()
									.append("line")
									.attr("class", "link") //Give each link the class "link"
									.attr("round", function(d) {
										return d.value; }) //Give each link the attribute "round" equal to the round they were made
									.attr("connectednodes", function(d) {
										return d.source.index + " " + d.target.index; }) //Make the two nodes the links connect the id for each of the links
									.attr("stroke-width", function(d) { //If the draw (value) of the link is greater than the value of the selected draw round, then make the link thicker
										// console.log(d);
										if (d.source.index == undefined || d.target.index == undefined) { //Dummy variable, so make line invisible
											return 0;
										} else {
											if (d.source_response >= 1 || d.target_response >= 1) { //met
												// return $('[value=met]').is(':checked') ? 3 : 0;
												return 3
											} else if (d.source_response === null && d.target_response === null) { //introduced
												// return $('[value=introduced]').is(':checked') ? 1 : 0;
												return 1;
											} else if (d.source_response <= 0 || d.target_response <= 0) { //did not meet
												// return $('[value=didnotmeet]').is(':checked') ? 2 : 0;
												return 2;
											} else {
												return 1;
											}
										}

									})
									.style("stroke", function(d) { //Coloring the match links
										if (d.source_response >= 1 || d.target_response >= 1) {
											return "#84b750"; //Green
										} else if (d.source_response === null && d.target_response === null) {
											return "ccc";
										} else if (d.source_response <= 0 || d.target_response <= 0) {
											return "#e8335d"; //red
										} else {
											return "#ccc";
										}
									});

								// apply tick now that link is define
								force.on("tick", tick); //On every tick, run the function "tick"

								/* link.append("title")
								 .text(function (d) {
								 	return d.draw_group_id;
								 	//return d.source.index + " " + d.target.index;
								  });*/
								//---------END CREATION OF LINKS--------------

								//create nodes after links to ensure the nodes appear on top of the links

								//--------- CREATION OF NODES------------------
								node = container.data(force.nodes())
									.append("g") //Group all nodes into the node group element
									.attr("class", "nodes")
									.selectAll(".node")
									.data(json.nodes)
									.enter()
									.append("g")
									.attr("class", "node")
									.attr('userid', function(d) {
										return d.userid })
									.attr("index", function(d) {
										//if(drawID>=0){d.fixed = true}//make the nodes fixed when you view a round
										return d.index
									})
									.call(force.drag)
									//.on('click', showProfile)
									//.on('mouseover', connectedNodes)
									//.on('mouseout', resetConnectedNodes)
									//.on('dblclick', connectedNodes); //Run connectedNodes when you double click
									.on('click', connectedNodes); //Run connectedNodes when you click

								node //if the participant has an image, append it
									.attr("xlink:href", function(d) {
										if ("image" in d) return d.image;
										else return d.url;
									})
									.append("circle")
									/*.attr("xlink:href", function(d){
									  if("image" in d){ return d.image }
									  else{ return "https://github.com/favicon.ico" }
									})*/
									.attr("r", 10)
									.style("fill", "#1babab")
									//.attr("x", -8)
									//.attr("y", -8)
									.attr("width", function(d) {
										if ("image" in d) {
											return 32 } else {
											return 16 }
									})
									.attr("height", function(d) {
										if ("image" in d) {
											return 32 } else {
											return 16 }
									})
									.on("mouseover", function() { d3.select(this).style("fill", "#1babab").attr("style", "cursor:pointer") })
									.on("mouseout", function() { d3.select(this).style("fill", "#1babab") })
									.on("dblclick.zoom", null);

								node.append("text") //Append the participant's name to the node image
									.attr("dx", 15)
									.attr("dy", ".35em")
									.attr("xlink:href", function(d) {
										return d.image })
									.text(function(d) {
										return d.first_name + ' ' + d.last_name.substring(0, 1) + '.' });
								//.attr("stroke", "white") //Outline text
								//.attr("stroke-width", ".2px");
								//---------END CREATION OF NODES--------------  

								//---------HIGHLIGHT CONNECTED NODES-----------
								var toggle = 0; //Toggle stores whether the highlighting is on
								var linkedByIndex = {}; //Create an array logging what is connected to what. if the element is equal to 1, there exists a connection
								for (var i = 0; i < json.nodes.length; i++) { //each node is connected to itself
									linkedByIndex[i + "," + i] = 1;
								};
								
								displayedlinks.links.forEach(function(d) { //find which node each node is connected to (links)
									linkedByIndex[d.source.index + "," + d.target.index] = 1;
								});

								function neighboring(a, b) { //looks up whether a pair are neigbors
									return linkedByIndex[a.index + "," + b.index];
								}

								function connectedNodes() {
									if (d3.event.defaultPrevented) return; //Leave the function if you're dragging the node
									d = d3.select(this).node().__data__;
									if (toggle == 0) { //Reduce the opacity of all but the neighboring nodes
										//display selected user's info
										$('#userinfoholder').empty(); //empty the user info		    		
										$('#userinfoholder').append('<p>' + d.first_name + ' ' + d.last_name + '</p>');
										$('#userinfoholder').append('<p>' + d.email + '</p>');
										if (d.group) $('#userinfoholder').append('<p>' + d.group + '</p>');
										// d3.select('[index="'+d.index+'"]')
										// 	.append('text')
										// 	.text('appended to clicked node');

										node.style("opacity", function(o) {
											return neighboring(o, d) | neighboring(d, o) ? 1 : 0.1;
										});
										link.style("opacity", function(o) {
											return d.index == o.source.index | d.index == o.target.index ? 1 : 0.1;
										});
										toggle = 1; //Reduce the opacity
									} else { //Put them back to opacity=1
										node.style("opacity", 1);
										link.style("opacity", 1);
										$('#userinfoholder').empty(); //empty the user info
										toggle = 0;
									}
								}
								
								function resetConnectedNodes() { //Put them back to opacity=1
									node.style("opacity", 1);
									link.style("opacity", 1);
									toggle = 0;
								}
								//---------END HIGHLIGHT CONNECTED NODES-----------
							}
							//----------------------------------- END UPDATE/CREATE MAP FUNCTION ----------------------------------- 

							updateMap(displayedlinks.links, drawID); //The initial map

							function nextRound() { //Update displayedlinks by adding a draw
								if (drawID >= totalRounds) { //Do not go above the total amount of rounds drawn
									finishMap(); //Finish the animation when you reach the last round
									// $('#next-round').attr('disabled', 'disabled');
									return;
								} else {
									// $('#previous-round').removeAttr('disabled');
								}

								drawID++;
								displayedlinks.links = []; //Reset the array of displayed links
								updateDisplayedLinks();

								//Text in the dropdown menu changes to the selected text
								if (drawID > totalRounds) {
									$('#matchListButton').html("<?php echo Yii::t('reporting','REPORTING_MROUND_LIST_BUTTON')?>" + "<span class='caret'></span>")
									$('#roundsListButton').html("<?php echo Yii::t('reporting','REPORTING_MROUND_LIST_BUTTON')?>" + "<span class='caret'></span>")
								} else {
									$('#matchListButton').html($('#matchDate-' + (totalRounds - drawID)).text() + "<span class='caret'></span>");
									$('#roundsListButton').html($('#matchDate-' + (totalRounds - drawID)).text() + "<span class='caret'></span>");
								}

								updateMap(displayedlinks.links, drawID);
								changeMatchTable('matchDate-' + (totalRounds - drawID));
							}

							function previousRound() { //Update displayedlinks by removing a draw
								if (drawID <= 0) { //will not go below -1 draws
									// $('#previous-round').attr('disabled', 'disabled');
									return;
								} else {
									// $('#next-round').removeAttr('disabled');
								}

								drawID--;
								displayedlinks.links = []; //Reset the array of displayed links

								updateDisplayedLinks();

								$(document).on('click', '#previous-round', function() { //Text in the dropdown menu changes to the selected text
									$('#matchListButton').html($('#matchDate-' + (totalRounds - drawID)).text() + "<span class='caret'></span>")
									$('#roundsListButton').html($('#matchDate-' + (totalRounds - drawID)).text() + "<span class='caret'></span>")
								});
								if (drawID == -1) {
									$(document).on('click', '#previous-round', function() { //Text in the dropdown menu changes to the selected text
										$('#roundsListButton').html("Select Round" + "<span class='caret'></span>")
										$('#matchListButton').html("Select Round" + "<span class='caret'></span>")
										$('#matchTable').html("<thead><tr><th>Please select a round to view the map of the matches.</th></tr></thead><tbody></tbody>")
									});
								}
								updateMap(displayedlinks.links, drawID);
								changeMatchTable('matchDate-' + (totalRounds - drawID));
							}

							function selectRound(selectedRound) {
								if (drawID == totalRounds) { //Do not go above the total amount of rounds drawn
									$('#next-round').attr('disabled', 'disabled');
									$('#previous-round').removeAttr('disabled');
								} else if (drawID == 1) {
									$('#previous-round').attr('disabled', 'disabled');
									$('#next-round').removeAttr('disabled');
								} else {
									$('#next-round').removeAttr('disabled');
									$('#previous-round').removeAttr('disabled');
								}

								drawID = selectedRound;

								if (drawID == totalRounds) { //Do not go above the total amount of rounds drawn
									$('#next-round').attr('disabled', 'disabled');
									$('#previous-round').removeAttr('disabled');
								} else if (drawID == 1) {
									$('#previous-round').attr('disabled', 'disabled');
									$('#next-round').removeAttr('disabled');
								} else {
									$('#next-round').removeAttr('disabled');
									$('#previous-round').removeAttr('disabled');
								}
								displayedlinks.links = [];
								updateDisplayedLinks();
								updateMap(displayedlinks.links, drawID);
							}

							// mapFilter = function(filter, state){
							// 	displayedlinks.links = [];
							// 	updateDisplayedLinks(filter, state);
							// 	updateMap(displayedlinks.links,drawID);
							// }

							$('input:checkbox[name=map-filter]').change(function() {
								// mapFilter($(this).attr('value'),$(this).is(':checked'));
								displayedlinks.links = [];
								updateDisplayedLinks();
								updateMap(displayedlinks.links, drawID);

								// updateMap(displayedlinks.links,drawID,$('[value=met]').is(':checked'), $('[value=introduced]').is(':checked'), $('[value=didnotmeet]').is(':checked'));
							});

							// ----------- RECORDING OF MOVEMENT WITHIN THE MAP ----------- 
							function tick(sap) {
								link.attr("x1", function(d) {
										return d.source.x; })
									.attr("y1", function(d) {
										return d.source.y; })
									.attr("x2", function(d) {
										return d.target.x; })
									.attr("y2", function(d) {
										return d.target.y; });
								node.attr("transform", function(d) {
									return "translate(" + d.x + "," + d.y + ")"; });
							}
							// force.on("tick", tick); //On every tick, run the function "tick"
							// ----------- END RECORDING OF MOVEMENT WITHIN THE MAP ----------- 

							// ------------------------- ANIMATE THE MAP ------------------------- 
							var mapIncrement;
							var animationState = 0;
							/**
							 * Animation states
							 * 0: not started
							 * 1: currently running
							 * 2: paused
							 * 3: finished
							 */
							function playMap() {
								$('#playMap').attr('disabled', 'disabled');
								$('#pauseMap').removeAttr('disabled');
								$('#next-round').removeAttr('disabled');
								$('#selectMatchRound').removeAttr('disabled');
								if (animationState == 1) {
									return; } //Do not run this if it has already started
								if (animationState == 0 || animationState == 3) drawID = -1; //If they didn't press play yet, start from the first round
								animationState = 1; //The animation has now started, so you won't go back to the first round when they press play again
								nextRound();
								mapIncrement = setInterval(nextRound, 2000);
							}

							function pauseMap() {
								$('#playMap').removeAttr('disabled');
								$('#pauseMap').removeAttr('disabled');
								animationState = 2;
								clearInterval(mapIncrement);
							}

							function finishMap() {
								$('#playMap').removeAttr('disabled');
								$('#pauseMap').removeAttr('disabled');
								animationState = 3;
								clearInterval(mapIncrement);
							}
							// ------------------------- END ANIMATE THE MAP ------------------------- 
						} //end else bracket to catch when getJSON returns an error, i.e. NO links exist for this campaign (maybe no matches have happened)
					});
				}

				function zoomed() {
					container.attr("transform", "scale(" + d3.event.scale + ") translate(" + d3.event.translate + ")");
				}







			}
		}
	}
])