## Component Hierarchy

* `App`

  * `Auth`
    * `AuthForm`

  * `HeaderNav`

    * `Feed` (/home, update stream, recently visited, random question)
      * `FeaturedMatches`
      * `UpdateIndexItem`

    * `MatchesIndex` (browse matches)
      * `MatchesFilter`
      * `MatchesIndexItem`
        * `LikeToggle`
        * `MatchesDetail` (Basically a profile page)
          * `MatchesDetailQuestions`
          * `MatchesDetailPhotos`
          * `LikeToggle`

    * `VisitorsIndex`
      * `YouVisitedDetail`
      * `VisitedYouDetail`

    * `LikesIndex`
      * `WhoLikesYouDetail`
      * `MutualLikesDetail`
      * `WhoYouLikeDetail`

    * `MessagesIndex`
      * `MessageRecievedDetail`
      * `MessageSentDetail`
      * `MessageFilteredDetail`
      * `FilterSettingsModal`

    * `ProfileIndex`
      * `AboutDetail`
        * `AboutDetailItem` ('six things')
          * `AboutDetailItemForm`
        * `DescriptionItem` (age, height, ethnicity, etc)
          * `DescriptionItemForm`
      * `PhotoDetail`
      * `QuestionsDetail`
        * `QuestionForm`

    * `FindUser`

    * `SettingsIndex`
      * `AccountDetail`
        * `AccountSettingForm`
