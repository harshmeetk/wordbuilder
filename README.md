# TwitterSearch

To get started <br>
<br>
1. cd into the folder <br>
2. Assuming NodeJS is installed(if not please do before moving forward) use the command(no quotes) "npm install".<br>
3. Now run the server using the command "node server.js" and navigate to url localhost:3000.<br>
4. Sample search "food", "@nytimes"
5. Enjoy!!!<br>

This is node JS based search web tool, which indexes and then searhces a corpus of tweets. The tweets can be searched with keywords, @users and #hashtags. #hashtags and @users are the links to new search actions with these terms as keywords (Clicking #node
starts a search for tweets containing #node).

STEPS Followed.
1. Cleaned the corpus, by using the fact that tweets are 140 characters (this is earlier when the tweet size was 140 characters).
2. Created an inverted index from this corpus (similar to what Elasticsearch does).
3. The ranking of the resultant tweets based on the TF-IDF retrieval model.

This uses the following Tweets Corpus for indexing and then searching. -> https://drive.google.com/uc?export=download&id=0B71CDXE-aD6gTS10R2ZvLWpJUVk

This uses a MVC model with the use of AngularJS, NodeJS , HTML and JS :)
