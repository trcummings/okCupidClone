## Component Hierarchy

* `App`

  * `Auth`
    * `AuthForm`

  * `HeaderNav`

    * `Feed` (/home, update stream, recently visited, random question)
      * `FeaturedMatches`
        * `MatchesIndexItem`
      * `UpdateIndexItem`
      * `QuestionItem`
      * `VisitorsIndex`
        * `YouVisitedItem`

    * `MatchesIndex`
      * `MatchesFilter`
      * `MatchesIndexItem`
        * `LikeToggle`
        * `MessageButton`
        * `MatchesDetail` (Basically a profile page)
          * `MatchesDetailQuestions`
          * `MatchesDetailPhotos`
          * `MessageButton`
          * `LikeToggle`

    * `VisitorsIndex`
      * `YouVisitedItem`
      * `VisitedYouItem`

    * `LikesIndex`
      * `WhoLikesYou`
      * `WhoYouLike`
      * `MutualLikes`

    * `MessagesIndex`
      * `MessageItem`
        * `MessageItemDetail`

    * `Profile`
      * `About`
        * `AboutItem` ('six things')
          * `AboutItemForm`
        * `Description` (age, height, ethnicity, etc)
          * `DescriptionForm`
      * `PhotoIndex`
        * `PhotoIndexItem`
          * `PhotoForm`
      * `Questions`
        * `AnswersIndex`
          * `AnswerIndexItem`
        * `QuestionForm`

    * `SettingsModal`
      * `AccountDetail`
        * `AccountSettingForm`
